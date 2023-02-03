using Microsoft.JSInterop;

namespace GamePortal.Helper
{
    public class HelperBrowser
    {
        [JSInvokable("BrowserOpen")]
        //[JSInvokableAttribute("BrowserOpen")]
        public static async void BrowserOpen(string Uri)
        {
            try
            {
                Uri uri = new(Uri);
                await Browser.Default.OpenAsync(uri, BrowserLaunchMode.External);
            }
            catch { }
        }
    }
}