using ZsirafWebShop.Transfer.Models.Caffs;

namespace ZsirafWebShop.Bll.Services.Caff
{
    public interface ICaffService
    {
        public Task<IEnumerable<CaffDto>> GetAllAsync();

        public Task<CaffGifDto> GetSingleAsync(int id);

        public Task<IEnumerable<CaffDto>> GetAllCreatedAsync();

        public Task<IEnumerable<CaffDto>> GetAllPurchasedAsync();

        public Task<CaffDto> CreateAsync(CreateCaffDto caff);

        public Task<CaffDto> UpdateAsync(UpdateCaffDto caff);

        public Task DeleteByIdAsync(int id);

        public Task PurchaseAsync(int id);
    }
}
