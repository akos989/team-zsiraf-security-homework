using Microsoft.AspNetCore.Http;
using ZsirafWebShop.Transfer.Models.Caffs;

namespace ZsirafWebShop.Bll.Services.Files
{
    public interface IFileService
    {
        Task<CaffFile> UploadFileAsync(IFormFile file);
    }
}
