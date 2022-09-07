using GamePortal.Public.Enum;
using GamePortal.Public.Struct;

namespace GamePortal.Public.Value
{
    internal class GameValue
    {
        public static Dictionary<GameEnum, GameStruct.Board> Games = new()
        {
            {
                GameEnum.Stray,
                new()
                {
                    Visibility = true,
                    Type = new[] { GameTypeEnum.Strategy, GameTypeEnum.Puzzle },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Stray",
                    Star = 5,
                    Image = "img/stray.jpg",
                    Address = "stray",
                    Description = "Stray is a 2D action platformer with a focus on exploration and combat. You play as a cat who has been separated from their owner and must find their way home.",
                    State = GameStateEnum.New
                }
            },
            {
                GameEnum.Valhalla,
                new()
                {
                    Visibility = true,
                    Type = new[] { GameTypeEnum.Action, GameTypeEnum.Adventure },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Valhalla",
                    Star = 4,
                    Image = "img/valhalla.jpg",
                    Address = "valhalla",
                    Description = "Valhalla is a 2D action platformer with a focus on exploration and combat. You play as a cat who has been separated from their owner and must find their way home.",
                    State = GameStateEnum.Old
                }
            },
            {
                GameEnum.Cyberpunk,
                new()
                {
                    Visibility = true,
                    Type = new[] { GameTypeEnum.Platform, GameTypeEnum.Shooter },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Cyberpunk",
                    Star = 3,
                    Image = "img/cyberpunk.jpg",
                    Address = "cyberpunk",
                    Description = "Cyberpunk is a 2D action platformer with a focus on exploration and combat. You play as a cat who has been separated from their owner and must find their way home.",
                    State = GameStateEnum.Hit
                }
            }
        };
    }
}