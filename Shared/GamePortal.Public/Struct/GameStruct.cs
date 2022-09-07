using System.Runtime.InteropServices;
using GamePortal.Public.Enum;

namespace GamePortal.Public.Struct
{
    internal class GameStruct
    {
        [StructLayout(LayoutKind.Sequential)]
        public struct Board
        {
            public int Star;
            public string Title;
            public string Image;
            public string Address;
            public bool Visibility;
            public string Description;
            public GameStateEnum State;
            public GameTypeEnum[] Type;
            public PlatformEnum[] Platform;
        }
    }
}