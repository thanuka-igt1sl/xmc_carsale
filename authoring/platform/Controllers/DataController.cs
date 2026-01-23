using System;
using System.Web.Http;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.SecurityModel;

namespace MyProject.Platform.Controllers
{
    public class DataController : ApiController
    {
        [HttpPost]
        [Route("api/custom/submit")]
        public IHttpActionResult SubmitValue([FromBody] MyDataModel model)
        {
            if (model == null) return BadRequest("Invalid data.");

            // LOGIC: Save to a database, update a Sitecore item, etc.
            // Example: Sitecore.Diagnostics.Log.Info("Received: " + model.Value, this);

            return Ok(new { status = "Success", received = model.Value });
        }

        [HttpPost]
        [Route("api/custom/update-item")]
        public IHttpActionResult UpdateTestValue()
        {
            var model = new MyDataModel();
            model.Value = "Thanuka Pathirana";
            // 1. Get the Master database (where content is edited)
            Database masterDb = Sitecore.Configuration.Factory.GetDatabase("master");

            // 2. The ID of the item you want to update
            ID itemId = new ID("{C828813A-58DA-4E58-9CDC-2EF641E49308}");
            Item item = masterDb.GetItem(itemId);

            if (item == null) return NotFound();

            try
            {
                // 3. SecurityDisabler allows the code to bypass login requirements
                using (new SecurityDisabler())
                {
                    item.Editing.BeginEdit();

                    // 4. Update the field "valuex"
                    item["ValueX"] = model.Value;

                    item.Editing.EndEdit();
                }

                // 5. Optional: Trigger a publish to Experience Edge so Next.js sees it
                // Sitecore.Publishing.PublishManager.PublishItem(...)

                return Ok(new { status = "Updated", newValue = model.Value });
            }
            catch (Exception ex)
            {
                item.Editing.CancelEdit();
                return InternalServerError(ex);
            }
        }
    }



    public class MyDataModel
    {
        public string Value { get; set; }
    }
}