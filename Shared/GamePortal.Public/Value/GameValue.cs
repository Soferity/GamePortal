using GamePortal.Public.Enum;
using GamePortal.Public.Struct;

namespace GamePortal.Public.Value
{
    public class GameValue
    {
        public static Dictionary<GameEnum, GameStruct> Games = new()
        {
            {
                GameEnum.Cube,
                new()
                {
                    Visibility = true,
                    Type = new[] { GameTypeEnum.Puzzle },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "The Cube",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/cube.jpg",
                    Address = "cube",
                    Description = "The Cube is a 2D action platformer with a focus on exploration and combat. You play as a cat who has been separated from their owner and must find their way home.",
                    State = GameStateEnum.Hit
                }
            },
            {
                GameEnum.TowerBlock,
                new()
                {
                    Visibility = true,
                    Type = new[] { GameTypeEnum.Platform },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Tower Block",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/towerblock.jpg",
                    Address = "towerblock",
                    Description = "Tower Block is a 2D action platformer with a focus on exploration and combat. You play as a cat who has been separated from their owner and must find their way home.",
                    State = GameStateEnum.New
                }
            },
            {
                GameEnum.ValorousRabbit,
                new()
                {
                    Visibility = true,
                    Type = new[] { GameTypeEnum.Action, GameTypeEnum.Adventure, GameTypeEnum.Platform },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Valorous Rabbit",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/valorousrabbit.jpg",
                    Address = "valorousrabbit",
                    Description = "Valorous Rabbit is a 2D action platformer with a focus on exploration and combat. You play as a cat who has been separated from their owner and must find their way home.",
                    State = GameStateEnum.New
                }
            },
            {
                GameEnum.Lazy2048,
                new()
                {
                    Visibility = true,
                    Type = new[] { GameTypeEnum.Puzzle, GameTypeEnum.Platform, GameTypeEnum.Strategy },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Lazy 2048",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/lazy2048.jpg",
                    Address = "lazy2048",
                    Description = "Lazy 2048 is a 2D action platformer with a focus on exploration and combat. You play as a cat who has been separated from their owner and must find their way home.",
                    State = GameStateEnum.Hit
                }
            },
            {
                GameEnum.Classic2048,
                new()
                {
                    Visibility = true,
                    Type = new[] { GameTypeEnum.Puzzle, GameTypeEnum.Platform, GameTypeEnum.Strategy },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Classic 2048",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/classic2048.jpg",
                    Address = "classic2048",
                    Description = "Classic 2048 is a 2D action platformer with a focus on exploration and combat. You play as a cat who has been separated from their owner and must find their way home.",
                    State = GameStateEnum.Old
                }
            },
            {
                GameEnum.SweetMemory,
                new()
                {
                    Visibility = true,
                    Type = new[] { GameTypeEnum.Puzzle, GameTypeEnum.Strategy },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Sweet Memory",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/sweetmemory.jpg",
                    Address = "sweetmemory",
                    Description = "SweetMemory is a 2D action platformer with a focus on exploration and combat. You play as a cat who has been separated from their owner and must find their way home.",
                    State = GameStateEnum.New
                }
            },
            {
                GameEnum.TicTacToe,
                new()
                {
                    Visibility = true,
                    Type = new[] { GameTypeEnum.Multiplayer, GameTypeEnum.Strategy },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Tic Tac Toe",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/tictactoe.jpg",
                    Address = "tictactoe",
                    Description = "Tic Tac Toe is a 2D action platformer with a focus on exploration and combat. You play as a cat who has been separated from their owner and must find their way home.",
                    State = GameStateEnum.Hit
                }
            },
            {
                GameEnum.MagicSquare,
                new()
                {
                    Visibility = true,
                    Type = new[] { GameTypeEnum.Strategy, GameTypeEnum.Puzzle },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Magic Square",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/magicsquare.jpg",
                    Address = "magicsquare",
                    Description = "Magic Square is a 2D action platformer with a focus on exploration and combat. You play as a cat who has been separated from their owner and must find their way home.",
                    State = GameStateEnum.Hit
                }
            }
        };
    }
}