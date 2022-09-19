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
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "The Cube",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/game/thecube.jpg",
                    Address = "thecube",
                    Description = "The Cube is a rubik's cube completion game. With the various settings offered, you can make your own custom rubik's cube. So you can test yourself. If you give up, you lose.",
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
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Tower Block",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/game/towerblock.jpg",
                    Address = "towerblock",
                    Description = "Tower Block is a game of stacking blocks. As you stack blocks on top of each other, you earn points. The higher you stack, the more points you earn. The game ends when you can no longer stack blocks.",
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
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Valorous Rabbit",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/game/valorousrabbit.jpg",
                    Address = "valorousrabbit",
                    Description = "Valorous Rabbit is an action adventure game. Try to escape from the hedgehog by taking the carrots. The most important thing is to never get caught by a hedgehog. If you lose your life, it's game over.",
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
                    Title = "Lazy 2048",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/game/lazy2048.jpg",
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
                    Build = BuildEnum.Develop,
                    Type = new[] { GameTypeEnum.Puzzle, GameTypeEnum.Platform, GameTypeEnum.Strategy },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Classic 2048",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/game/classic2048.jpg",
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
                    Build = BuildEnum.Release,
                    Type = new[] { GameTypeEnum.Puzzle, GameTypeEnum.Strategy },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Sweet Memory",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/game/sweetmemory.jpg",
                    Address = "sweetmemory",
                    Description = "Sweet memory is a memory game. Flip the squares and see the icon behind them. Then look behind more squares to find the same icon. If you find the same icon, you get a point.", //If you don't, the squares will flip back over. Try to get as many points as you can.
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
                    Title = "Tic Tac Toe",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/game/tictactoe.jpg",
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
                    Build = BuildEnum.Develop,
                    Type = new[] { GameTypeEnum.Strategy, GameTypeEnum.Puzzle },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "Magic Square",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/game/magicsquare.jpg",
                    Address = "magicsquare",
                    Description = "Magic Square is a 2D action platformer with a focus on exploration and combat. You play as a cat who has been separated from their owner and must find their way home.",
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
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/game/hextris.jpg",
                    Address = "hextris",
                    Description = "Hextris is a 2D action platformer with a focus on exploration and combat. You play as a cat who has been separated from their owner and must find their way home.",
                    State = GameStateEnum.Hit
                }
            },
            {
                GameEnum.TheAviator,
                new()
                {
                    Visibility = true,
                    Build = BuildEnum.Develop,
                    Type = new[] { GameTypeEnum.Action, GameTypeEnum.Platform },
                    Platform = new[] { PlatformEnum.MacCatalyst, PlatformEnum.WinUI, PlatformEnum.Android, PlatformEnum.iOS },
                    Title = "The Aviator",
                    Play = "Play Game",
                    Star = 5,
                    Image = "img/game/theaviator.jpg",
                    Address = "theaviator",
                    Description = "The Aviator is a 2D action platformer with a focus on exploration and combat. You play as a cat who has been separated from their owner and must find their way home.",
                    State = GameStateEnum.New
                }
            }
        };
    }
}