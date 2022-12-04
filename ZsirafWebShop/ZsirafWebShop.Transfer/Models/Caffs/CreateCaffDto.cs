using Microsoft.AspNetCore.Http;

namespace ZsirafWebShop.Transfer.Models.Caffs
{
    public class CreateCaffDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public IFormFile CaffFile { get; set; }
    }
}
