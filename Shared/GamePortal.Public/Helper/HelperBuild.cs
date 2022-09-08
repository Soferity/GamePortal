using GamePortal.Public.Enum;

namespace GamePortal.Public.Helper
{
    internal class HelperBuild
    {
        public static BuildEnum GetBuild
        {
#if DEBUG
            get => BuildEnum.Develop;
#else
            get => BuildEnum.Release;
#endif
        }
    }
}
