using ZsirafWebShop.Transfer.Models.Caff;

namespace ZsirafWebShop.Bll.Services.Caff
{
    public class CaffService : ICaffService
    {
        public Task<CaffDto> CreateAsync(CreateCaffDto caff)
        {
            throw new NotImplementedException();
        }

        public Task DeleteByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<CaffDto>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<CaffDto>> GetAllCreatedAsync()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<CaffDto>> GetAllPurchasedAsync()
        {
            throw new NotImplementedException();
        }

        public Task<CaffDto> GetSingleAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task PurchaseAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<CaffDto> UpdateAsync(UpdateCaffDto caff)
        {
            throw new NotImplementedException();
        }
    }
}
