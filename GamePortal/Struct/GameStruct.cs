using System.Runtime.InteropServices;
using GamePortal.Enum;

namespace GamePortal.Struct
{
    [StructLayout(LayoutKind.Sequential)]
    public struct GameStruct
    {
        public int Star;
        public string Title;
        public string Address;
        public bool Visibility;
        public BuildEnum Build;
        public GameStateEnum? State;
        public GameTypeEnum[] Type;
        public PlatformEnum[] Platform;
    }
}