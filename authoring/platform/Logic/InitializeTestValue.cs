using Sitecore.Data;
using Sitecore.Pipelines;
using Sitecore.SecurityModel;
using Sitecore.Data.Items;

namespace XmCloudNextJsStarter.Logic
{
    public class InitializeTestValue
    {
        public void Process(PipelineArgs args)
        {
            Database masterDb = Sitecore.Configuration.Factory.GetDatabase("master");
            ID itemId = new ID("{C828813A-58DA-4E58-9CDC-2EF641E49308}");
            Item item = masterDb?.GetItem(itemId);

            if (item != null && item["ValueX"] != "Thanuka Pathirana")
            {
                using (new SecurityDisabler())
                {
                    item.Editing.BeginEdit();
                    item["ValueX"] = "Thanuka Pathirana";
                    item.Editing.EndEdit();
                }
            }
        }
    }
}