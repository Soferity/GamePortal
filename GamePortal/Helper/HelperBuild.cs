﻿using Taiizor.Essentials.Blazor.Enum;

namespace GamePortal.Helper
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