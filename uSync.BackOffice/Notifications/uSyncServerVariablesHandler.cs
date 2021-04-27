﻿using System.Collections.Generic;

using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Options;

using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Hosting;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Infrastructure.WebAssets;
using Umbraco.Extensions;

using uSync.BackOffice.Configuration;
using uSync.BackOffice.Controllers;
using uSync.BackOffice.Hubs;

namespace uSync.BackOffice.Notifications
{
    public class uSyncServerVariablesHandler : INotificationHandler<ServerVariablesParsing>
    {
        private uSyncConfigService uSyncConfig;

        private LinkGenerator linkGenerator;
        private UriUtility uriUtility;

        private uSyncHubRoutes uSyncHubRoutes;

        private string umbracoMvcArea;

        public uSyncServerVariablesHandler(LinkGenerator linkGenerator, UriUtility uriUtility,
            IOptions<GlobalSettings> globalSettings,
            uSyncConfigService uSyncConfigService,
            IHostingEnvironment hostingEnvironment,
            uSyncHubRoutes hubRoutes)
        {
            this.linkGenerator = linkGenerator;
            this.uriUtility = uriUtility;
            this.uSyncConfig = uSyncConfigService;
            this.uSyncHubRoutes = hubRoutes;

            umbracoMvcArea = globalSettings.Value.GetUmbracoMvcArea(hostingEnvironment);

        }

        public void Handle(ServerVariablesParsing notification)
        {
            notification.ServerVariables.Add("uSync", new Dictionary<string, object>
            {
                { "uSyncService", linkGenerator.GetUmbracoApiServiceBaseUrl<uSyncDashboardApiController>(controller => controller.GetApi()) },
                { "signalRHub",  uSyncHubRoutes.GetuSyncHubRoute() }
            });
        }

        private string GetSignalRHub()
        {
            return $"/{umbracoMvcArea}/{nameof(SyncHub)}";
        }
    }
}