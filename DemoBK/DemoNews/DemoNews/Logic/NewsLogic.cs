using DemoNews.Entity;
using Microsoft.AspNetCore.Http;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.SearchTypes;
using Sitecore.Data.Items;
using Sitecore.Links;
using System.Net.Http;

namespace DemoNews.Logic
{
    public class NewsLogic
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public NewsLogic(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public List<NewsItemEntity> GetNewsData()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            var queryString = httpContext.Request.Query;
            var fromDateParam = queryString["from"].ToString();
            var toDateParam = queryString["to"].ToString();
            var search = queryString["search"].ToString();
            // var database = Sitecore.Configuration.Factory.GetDatabase("web");
            var database = Sitecore.Context.Database;
            string itemPath = "/sitecore/content/sitecore-demo/home/news";
            // Path to your items
            var indexName = string.Format("sitecore_{0}_index", database.Name);
            var index = ContentSearchManager.GetIndex(indexName);
            using (var searchContext = index.CreateSearchContext())
            {
                var query = searchContext.GetQueryable<SearchResultItem>()
                        .Where(item => item.Paths.Contains(database.GetItem(itemPath).ID));

                if (!string.IsNullOrEmpty(search))
                {
                    query = query.Where(x => x["title"].Contains(search) || x["description"].Contains(search));
                }


                var searchResults = query
                 .Where(item => item.TemplateName == "NewsItemComponent")
                 .OrderByDescending(item => item["date"]) // Sort directly on the indexed field
                 .Select(result => result.GetItem())
                 .ToList();



                var items = searchResults.Select(item => new NewsItemEntity
                {
                    Id = item.ID.Guid,
                    Title = item.Fields["title"]?.Value,
                    Description = item.Fields["description"]?.Value,
                    Date = item.Fields["date"]?.Value,
                    body = item.Fields["body"]?.Value,
                    Url = LinkManager.GetItemUrl(item)

                }).ToList();

                if (DateTime.TryParse(fromDateParam, out DateTime fromDate) &&
                DateTime.TryParse(toDateParam, out DateTime toDate))
                {
                    // Convert to Sitecore's ISO date format
                    //var fromDateString = fromDate.ToString("yyyyMMddTHHmmssZ");
                    //var toDateString = toDate.ToString("yyyyMMddTHHmmssZ");

                    items = items.Where(item => DateTime.Parse(item.Date) > DateTime.Parse(fromDateParam) && DateTime.Parse(item.Date) < DateTime.Parse(toDateParam)).ToList();
                }

                return items;
            }

        }
    }
}
