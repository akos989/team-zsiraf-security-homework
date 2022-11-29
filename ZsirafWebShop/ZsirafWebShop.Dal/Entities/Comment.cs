namespace ZsirafWebShop.Dal.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int UserId { get; set; }
        public int CaffFileId { get; set; }
        public virtual User User { get; set; }
        public virtual CaffFile CaffFile { get; set; }
    }
}
