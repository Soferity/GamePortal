using Microsoft.JSInterop;
using Taiizor.Essentials.Maui.AppCenter.Services;

namespace GamePortal.Helper
{
    public class HelperEvent
    {
        [JSInvokable("TrackEventBasic")]
        //[JSInvokableAttribute("TrackEventBasic")]
        public static void TrackEventBasic(string Name) => AppCenterService.TrackEvent(Name);

        [JSInvokable("TrackEventNormal")]
        //[JSInvokableAttribute("TrackEventNormal")]
        public static void TrackEventNormal(string Name, string Key, string Value) => AppCenterService.TrackEvent(Name, new Dictionary<string, string>() { { Key, Value } });

        [JSInvokable("TrackEventAdvanced")]
        //[JSInvokableAttribute("TrackEventAdvanced")]
        public static void TrackEventAdvanced(string Name, IDictionary<string, string> Properties = null) => AppCenterService.TrackEvent(Name, Properties);
    }
}