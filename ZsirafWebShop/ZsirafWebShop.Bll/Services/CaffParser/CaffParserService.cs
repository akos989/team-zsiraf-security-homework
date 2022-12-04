using System.Diagnostics;

namespace ZsirafWebShop.Bll.Services.CaffParser
{
    public static class CaffParserService
    {
        public static string RunParser(string caffPath, string gifFilePath)
        {
            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "caff_parser.exe",
                    Arguments = caffPath + " " + gifFilePath,
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    CreateNoWindow = true,
                }
            };
            process.Start();
            process.WaitForExit();

            return process.StandardOutput.ReadToEnd();
        } 
    }
}
