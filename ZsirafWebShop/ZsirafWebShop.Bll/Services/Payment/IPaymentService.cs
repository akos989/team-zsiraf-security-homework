namespace ZsirafWebShop.Bll.Services.Payment
{
    public interface IPaymentService
    {
        public Task<bool> PurchaseAsync(int buyerId, int caffId);
    }
}
