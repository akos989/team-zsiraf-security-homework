using AutoMapper;
using ZsirafWebShop.Dal.Entities;
using ZsirafWebShop.Transfer.Models.User;

namespace ZsirafWebShop.Bll.Mapping
{
    public static partial class MapperConfig
    {
        public static IMapper ConfigureAutoMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDto>();
            });

            config.AssertConfigurationIsValid();

            return config.CreateMapper();
        }
    }
}
