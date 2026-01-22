using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoNews.Entity
{
    public class NewsItemEntity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }

        public string body { get; set; }
        public string Url { get; set; }
    }
}
