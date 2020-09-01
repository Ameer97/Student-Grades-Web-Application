using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Ammar.Common
{
    public class Common
    {
        public static string MD5(string sSourceData)
        {
            byte[] tmpSource;
            byte[] tmpHash;

            //Create a byte array from source data.
            tmpSource = ASCIIEncoding.ASCII.GetBytes(sSourceData);
            tmpHash = new MD5CryptoServiceProvider().ComputeHash(tmpSource);
            string b = "";
            foreach (var item in tmpHash)
                b += Convert.ToUInt32(item).ToString("X");

            return b;
        }
    }
}
