namespace ZsirafWebShop.Dal.Entities
{
    public class CaffFile
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int CreatorId { get; set; }
        public long Price { get; set; }
        public string CaffFileRef { get; set; }

        public virtual User Creator { get; set; }
        public virtual ICollection<CaffFileUser> Owners { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
