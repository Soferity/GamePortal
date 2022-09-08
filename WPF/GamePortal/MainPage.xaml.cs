using Microsoft.Extensions.DependencyInjection;
using System.Windows;

namespace GamePortal
{
    /// <summary>
    /// MainPage.xaml etkileşim mantığı
    /// </summary>
    public partial class MainPage : Window
    {
        public MainPage()
        {
            ServiceCollection serviceCollection = new ServiceCollection();
            serviceCollection.AddWpfBlazorWebView();

#if DEBUG
            serviceCollection.AddBlazorWebViewDeveloperTools();
#endif

            Resources.Add("services", serviceCollection.BuildServiceProvider());

            InitializeComponent();
        }
    }
}