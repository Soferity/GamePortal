using GamePortal.Enum;

namespace GamePortal.Helper
{
    internal class HelperDevice
    {
        public static DeviceEnum GetDevice => HelperPlatform.GetPlatform switch
        {
            PlatformEnum.iOS => DeviceEnum.iPhone,
            PlatformEnum.Android => DeviceEnum.Android,
            PlatformEnum.MacCatalyst => DeviceEnum.MacBook,
            _ => DeviceEnum.Windows,
        };

        public static DeviceTypeEnum GetDeviceType => HelperPlatform.GetPlatform switch
        {
            PlatformEnum.iOS or PlatformEnum.Android => DeviceTypeEnum.Mobile,
            _ => DeviceTypeEnum.Desktop,
        };
    }
}