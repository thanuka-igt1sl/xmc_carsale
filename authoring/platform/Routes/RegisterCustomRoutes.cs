using System.Web.Http;
using System.Web.Routing;
using Sitecore.Pipelines;

namespace MyProject.Platform.Pipelines
{
    public class RegisterCustomRoutes
    {
        public void Process(PipelineArgs args)
        {
            GlobalConfiguration.Configure(config =>
            {
                // This enables the [Route] attributes used in Step 2
                config.MapHttpAttributeRoutes();
            });
        }
    }
}