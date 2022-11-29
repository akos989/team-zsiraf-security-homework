namespace ZsirafWebShop.Dal.Entities
{
    public class CaffToUser
    {
        public int UserId { get; set; }
        public int CaffFileId { get; set; }
        public virtual User User { get; set; }
        public virtual Caff Caff { get; set; }
    }
}
