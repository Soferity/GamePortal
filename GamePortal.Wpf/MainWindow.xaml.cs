using Microsoft.Extensions.DependencyInjection;
using System.Windows;

namespace GamePortal.Wpf
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            ServiceCollection serviceCollection = new ServiceCollection();
            serviceCollection.AddWpfBlazorWebView();

#if DEBUG
            serviceCollection.AddBlazorWebViewDeveloperTools();
#endif

            Resources.Add("services", serviceCollection.BuildServiceProvider());
        }
    }
}