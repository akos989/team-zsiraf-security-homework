﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using ZsirafWebShop.Bll.Exceptions;
using ZsirafWebShop.Bll.Services.Payment;
using ZsirafWebShop.Dal.Context;
using ZsirafWebShop.Transfer.Models.Caffs;

namespace ZsirafWebShop.Bll.Services.Caff
{
    public class CaffService : ICaffService
    {
        private readonly WebShopDbContext dbContext;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IPaymentService paymentService;
        private readonly IAuthorizationService authorizationService;

        private string UserId => httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        public CaffService(WebShopDbContext dbContext, IMapper mapper, IHttpContextAccessor httpContextAccessor, IPaymentService paymentService, IAuthorizationService authorizationService)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
            this.paymentService = paymentService;
            this.authorizationService = authorizationService;
        }

        public async Task<CaffDto> CreateAsync(CreateCaffDto caff)
        {
            if (int.TryParse(UserId, out var userId))
            {
                var entity = new Dal.Entities.Caff
                {
                    CreatorId = userId,
                    Title = caff.Title,
                    Description = caff.Description,
                    Price = caff.Price,
                    // CaffRef = caff.CaffRef TODO
                };

                await dbContext.Caffs.AddAsync(entity);
                await dbContext.SaveChangesAsync();

                var dto = mapper.Map<CaffDto>(entity);

                return dto;
            }
            throw new ArgumentNullException($"User not found!");
        }

        public async Task DeleteByIdAsync(int id)
        {
            var entity = await dbContext.Caffs.FindAsync(id);

            if (entity == null)
            {
                throw new ArgumentException($"Caff not found!");
            }

            var authorizationResult = await authorizationService.AuthorizeAsync(httpContextAccessor.HttpContext.User, entity, "CaffCreatorOnly");

            if (!authorizationResult.Succeeded)
            {
                throw new HttpException(403, $"User with id:{UserId} cannot delete Caff with id:{id}");
            }
            
            dbContext.Caffs.Remove(entity);
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<CaffDto>> GetAllAsync()
        {
            var entities = await dbContext.Caffs
                .Include(a => a.Creator)
                .Include(a => a.Buyers)
                .ToListAsync();

            return mapper.Map<List<CaffDto>>(entities);
        }

        public async Task<IEnumerable<CaffDto>> GetAllCreatedAsync()
        {
            var entities = await dbContext.Caffs
                .Include(a => a.Creator)
                .Include(a => a.Buyers)
                .Where(a => a.CreatorId.ToString() == UserId)
                .ToListAsync();

            return mapper.Map<List<CaffDto>>(entities);
        }

        public async Task<IEnumerable<CaffDto>> GetAllPurchasedAsync()
        {
            var entity = await dbContext.Users
                .Include(a => a.PurchasedCaffs)
                .FirstOrDefaultAsync(a => a.Id.ToString() == UserId);

            if (entity == null)
            {
                throw new ArgumentException($"User not found!");
            }

            return mapper.Map<List<CaffDto>>(entity.PurchasedCaffs);
        }

        public async Task<CaffDto> GetSingleAsync(int id)
        {
            var entity = await dbContext.Caffs
               .Include(a => a.Creator)
               .Include(a => a.Buyers)
               .FirstOrDefaultAsync(a => a.Id == id);

            return mapper.Map<CaffDto>(entity);
        }

        public async Task PurchaseAsync(int id)
        {
            var user = await dbContext.Users
                .FirstOrDefaultAsync(u => u.Id == int.Parse(UserId));

            if (user == null) { throw new ArgumentException($"User with id:{UserId} not found"); }

            var entity = await dbContext.Caffs
               .Include(a => a.Creator)
               .Include(a => a.Buyers)
               .FirstOrDefaultAsync(a => a.Id == id);

            if (entity == null) { throw new ArgumentException($"Caff with id:{id} not found"); }

            var result = await paymentService.PurchaseAsync(int.Parse(UserId), id);

            if (!result)
            {
                throw new ArgumentException($"Payment failed!");
            }

            entity.Buyers.Add(user);
            await dbContext.SaveChangesAsync();

            return;
        }

        public async Task<CaffDto> UpdateAsync(UpdateCaffDto caff)
        {
            var entity = await dbContext.Caffs.FindAsync(caff.Id);

            if (entity == null)
            {
                throw new ArgumentException($"Caff not found with id: {caff.Id}!");
            }

            var authorizationResult = await authorizationService.AuthorizeAsync(httpContextAccessor.HttpContext.User, entity, "CaffCreatorOnly");

            if (!authorizationResult.Succeeded)
            {
                throw new HttpException(403, $"User with id:{UserId} cannot update Caff with id:{caff.Id}");
            }

            entity.Price = caff.Price;
            entity.Title = caff.Title;
            entity.Description = caff.Description;

            await dbContext.SaveChangesAsync();

            return mapper.Map<CaffDto>(entity);
        }
    }
}
