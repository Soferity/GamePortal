using System.Runtime.InteropServices;
using GamePortal.Enum;

namespace GamePortal.Struct
{
    [StructLayout(LayoutKind.Sequential)]
    public struct GameStruct
    {
        public int Star;
        public string Play;
        public string Title;
        public string Image;
        public string Address;
        public bool Visibility;
        public BuildEnum Build;
        public string Description;
        public GameStateEnum? State;
        public GameTypeEnum[] Type;
        public PlatformEnum[] Platform;
    }
}