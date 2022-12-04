using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ZsirafWebShop.Bll.Services.Caff;
using ZsirafWebShop.Transfer.Models.Caffs;

namespace ZsirafWebShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CaffController : ControllerBase
    {
        private readonly ICaffService caffService;

        public CaffController(ICaffService caffService)
        {
            this.caffService = caffService;
        }

        [HttpGet]
        public async Task<IEnumerable<CaffDto>> GetAllAsync()
            => await caffService.GetAllAsync();

        [HttpGet("{id}")]
        public async Task<CaffDto> GetSingleAsync(int id)
            => await caffService.GetSingleAsync(id);

        [HttpGet("download/{id}")]
        public async Task<ActionResult> DownloadFileAsync(int id)
        {
            var path = await caffService.DownloadFileAsync(id);

            if(System.IO.File.Exists(path))
            {
                return File(System.IO.File.OpenRead(path), "application/octet-stream", Path.GetFileName(path));
            }
            return NotFound();
        }

        [HttpGet("created")]
        public async Task<IEnumerable<CaffDto>> GetAllCreatedAsync()
            => await caffService.GetAllCreatedAsync();

        [HttpGet("purchased")]
        public async Task<IEnumerable<CaffDto>> GetAllPurchasedAsync()
            => await caffService.GetAllPurchasedAsync();

        [HttpPost]
        public async Task<CaffDto> CreateAsync([FromForm] CreateCaffDto caff)
            => await caffService.CreateAsync(caff);

        [HttpPut]
        public async Task<CaffDto> UpdateAsync([FromBody] UpdateCaffDto caff)
            => await caffService.UpdateAsync(caff);

        [HttpDelete("{id}")]
        public async Task DeleteByIdAsync(int id)
            => await caffService.DeleteByIdAsync(id);

        [HttpPost("{id}")]
        public async Task PurchaseAsync(int id)
            => await caffService.PurchaseAsync(id);
    }
}
