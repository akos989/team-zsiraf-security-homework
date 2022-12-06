using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using ZsirafWebShop.Bll.Services.CaffParser;
using ZsirafWebShop.Transfer.Models.Caffs;

namespace ZsirafWebShop.Bll.Services.Files
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment env;

        private readonly string FileDictionary = "CaffFiles";
        private readonly string GifDictionary = "Gifs";
        private readonly string validExtension = "caff";


        public FileService(IHostingEnvironment env)
        {
            this.env = env;
        }

        public async Task<CaffFile> UploadFileAsync(IFormFile file)
        {
            var fileExtension = file.FileName.Split('.').Last().ToLower();

            if (fileExtension != validExtension)
                throw new ArgumentException("Bad fileformat!");

            string fileDic = Path.Combine(env.ContentRootPath, FileDictionary);
            if (!Directory.Exists(fileDic))
            {
                Directory.CreateDirectory(fileDic);
            }
            var fileName = Guid.NewGuid();

            var caffFilePath = Path.Combine(fileDic, fileName + $".caff");
            var gifFilePath = Guid.NewGuid() + ".gif";

            var caffFile = new CaffFile
            {
                CaffPath = caffFilePath,
                GifPath = gifFilePath,
                OriginalFileName = file.FileName
            };

            using (FileStream fs = File.Create(caffFilePath))
            {
                await file.CopyToAsync(fs);
            }

            CaffParserService.RunParser(caffFilePath, Path.Combine(env.ContentRootPath, GifDictionary, gifFilePath));

            return caffFile;
        }

    }
}
