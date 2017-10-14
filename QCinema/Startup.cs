using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(QCinema.Startup))]
namespace QCinema
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
