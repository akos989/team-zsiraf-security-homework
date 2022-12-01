﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZsirafWebShop.Bll.Services.Comment;
using ZsirafWebShop.Transfer.Models.Comments;

namespace ZsirafWebShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService commentService;

        public CommentController(ICommentService commentService)
        {
            this.commentService = commentService;
        }

        [HttpPost]
        [Authorize(Policy = "Purchased")] // TODO Purchased
        public async Task<CommentDto> CreateAsync([FromBody] CreateCommentDto comment)
            => await commentService.CreateAsync(comment);

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin", Policy = "CommentCreatorOnly")]
        public async Task DeleteByIdAsync(int id)
            => await commentService.DeleteByIdAsync(id);
    }
}
