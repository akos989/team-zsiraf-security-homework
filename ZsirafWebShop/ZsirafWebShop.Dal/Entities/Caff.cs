﻿namespace ZsirafWebShop.Dal.Entities
{
    public class Caff
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int CreatorId { get; set; }
        public long Price { get; set; }
        public string CaffRef { get; set; }

        public virtual User Creator { get; set; }
        public virtual ICollection<CaffToUser> Buyers { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
