namespace ZsirafWebShop.Dal.Entities
{
    public class CaffFileUser
    {
        public int UserId { get; set; }
        public int CaffFileId { get; set; }
        public virtual User User { get; set; }
        public virtual CaffFile CaffFile { get; set; }
    }
}
