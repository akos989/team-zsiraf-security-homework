namespace ZsirafWebShop.Bll.Services.Payment
{
    public class PaymentService : IPaymentService
    {
        public Task<bool> PurchaseAsync(int buyerId, int caffId)
        {
            return Task.FromResult(true);
        }
    }
}
