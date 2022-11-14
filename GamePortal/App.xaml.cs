using GamePortal.Manage;

namespace GamePortal
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();

            MainPage = new MainPage();
        }

        protected override Window CreateWindow(IActivationState activationState)
        {
            Window window = base.CreateWindow(activationState);

            if (window != null)
            {
                window.Title = General.Title;

                //window.X = General.WindowX;
                //window.Y = General.WindowY;

                //window.Height = General.WindowHeight;
                //window.Width = General.WindowWidth;

                //window.MinimumHeight = General.WindowHeight;
                //window.MinimumWidth = General.WindowWidth;

                //window.MaximumHeight = General.WindowHeight;
                //window.MaximumWidth = General.WindowWidth;
            }

            return window;
        }
    }
}