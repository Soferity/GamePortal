using GamePortal.Enum;
using GamePortal.Struct;

namespace GamePortal.Value
{
    internal class GameValue
    {
        public static Dictionary<GameEnum, GameStruct> Games = new()
        {
            {
                GameEnum.Cube,
                new()
                {
                    Visibility = true,
                    Build = BuildEnum.Release,
                    Type = new[] { GameTypeEnum.Puzzle, GameTypeEnum.Simulation },
                    Platform = new[] { PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "TheCube",
                    Star = 5,
                    Image = "TheCube",
                    Address = "thecube",
                    Description = "TheCube",
                    State = GameStateEnum.Hit
                }
            },
            {
                GameEnum.TowerBlock,
                new()
                {
                    Visibility = true,
                    Build = BuildEnum.Release,
                    Type = new[] { GameTypeEnum.Platform, GameTypeEnum.Action },
                    Platform = new[] { PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "TowerBlock",
                    Star = 5,
                    Image = "TowerBlock",
                    Address = "towerblock",
                    Description = "TowerBlock",
                    State = GameStateEnum.New
                }
            },
            {
                GameEnum.ValorousRabbit,
                new()
                {
                    Visibility = true,
                    Build = BuildEnum.Release,
                    Type = new[] { GameTypeEnum.Action, GameTypeEnum.Adventure },
                    Platform = new[] { PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "ValorousRabbit",
                    Star = 5,
                    Image = "ValorousRabbit",
                    Address = "valorousrabbit",
                    Description = "ValorousRabbit",
                    State = GameStateEnum.New
                }
            },
            {
                GameEnum.Lazy2048,
                new()
                {
                    Visibility = true,
                    Build = BuildEnum.Develop,
                    Type = new[] { GameTypeEnum.Puzzle, GameTypeEnum.Platform, GameTypeEnum.Strategy },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Lazy2048",
                    Star = 5,
                    Image = "Lazy2048",
                    Address = "lazy2048",
                    Description = "Lazy2048",
                    State = GameStateEnum.Hit
                }
            },
            {
                GameEnum.Classic2048,
                new()
                {
                    Visibility = true,
                    Build = BuildEnum.Develop,
                    Type = new[] { GameTypeEnum.Puzzle, GameTypeEnum.Platform, GameTypeEnum.Strategy },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Classic2048",
                    Star = 5,
                    Image = "Classic2048",
                    Address = "classic2048",
                    Description = "Classic2048",
                    State = GameStateEnum.Old
                }
            },
            {
                GameEnum.SweetMemory,
                new()
                {
                    Visibility = true,
                    Build = BuildEnum.Release,
                    Type = new[] { GameTypeEnum.Puzzle, GameTypeEnum.Strategy },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "SweetMemory",
                    Star = 5,
                    Image = "SweetMemory",
                    Address = "sweetmemory",
                    Description = "SweetMemory",
                    State = GameStateEnum.New
                }
            },
            {
                GameEnum.TicTacToe,
                new()
                {
                    Visibility = true,
                    Build = BuildEnum.Develop,
                    Type = new[] { GameTypeEnum.Multiplayer, GameTypeEnum.Strategy },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "TicTacToe",
                    Star = 5,
                    Image = "TicTacToe",
                    Address = "tictactoe",
                    Description = "TicTacToe",
                    State = GameStateEnum.Hit
                }
            },
            {
                GameEnum.MagicSquare,
                new()
                {
                    Visibility = true,
                    Build = BuildEnum.Develop,
                    Type = new[] { GameTypeEnum.Strategy, GameTypeEnum.Puzzle },
                    Platform = new[] { PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "MagicSquare",
                    Star = 5,
                    Image = "MagicSquare",
                    Address = "magicsquare",
                    Description = "MagicSquare",
                    State = GameStateEnum.Hit
                }
            },
            {
                GameEnum.Hextris,
                new()
                {
                    Visibility = true,
                    Build = BuildEnum.Develop,
                    Type = new[] { GameTypeEnum.Strategy, GameTypeEnum.Puzzle, GameTypeEnum.Action },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Hextris",
                    Star = 5,
                    Image = "Hextris",
                    Address = "hextris",
                    Description = "Hextris",
                    State = GameStateEnum.Hit
                }
            },
            {
                GameEnum.TheAviator,
                new()
                {
                    Visibility = true,
                    Build = BuildEnum.Release,
                    Type = new[] { GameTypeEnum.Action, GameTypeEnum.Platform },
                    Platform = new[] { PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "TheAviator",
                    Star = 5,
                    Image = "TheAviator",
                    Address = "theaviator",
                    Description = "TheAviator",
                    State = GameStateEnum.New
                }
            },
            {
                GameEnum.TowerOfHanoi,
                new()
                {
                    Visibility = true,
                    Build = BuildEnum.Release,
                    Type = new[] { GameTypeEnum.Puzzle, GameTypeEnum.Strategy },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "TowerOfHanoi",
                    Star = 5,
                    Image = "TowerOfHanoi",
                    Address = "towerofhanoi",
                    Description = "TowerOfHanoi",
                    State = GameStateEnum.New
                }
            }
        };
    }
}