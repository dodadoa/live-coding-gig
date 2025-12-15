

import Sound.Tidal.Context
import Sound.Tidal.ID
import qualified Data.Map as Map
import System.IO (hSetEncoding, stdout, utf8)

hSetEncoding stdout utf8

tidal <- startTidal (superdirtTarget {oLatency = 0.05, oAddress = "127.0.0.1", oPort = 57120}) (defaultConfig {cVerbose = True, cFrameTimespan = 1/20})

-- recv :: Num a => (Pattern a -> ControlPattern) -> Pattern Int -> ControlPattern
-- recv cpf busid = (tParam pI) (fmap (\v -> '^':((Map.keys v) !! 0)) $ cpf 0) busid
--
-- send :: Pattern Int ->  Pattern Double -> ControlPattern
-- send busid pat = pF "" pat # pI "^" busid

-- controlbus tidal x num pat = streamReplace tidal (Sound.Tidal.ID.ID $ "cb" ++ (show num)) $ struct "t*128" $ send num pat
-- some predefined recv shortcuts

-- genrecv name busid = pI ("^" ++ name) busid

-- cloudsrecv num pat = pat
--       # genrecv "cloudspitch" (num)
--       # genrecv "cloudspos" (num + 1)
--       # genrecv "cloudssize" (num + 2)
--       # genrecv "cloudsdens" (num + 3)
--       # genrecv "cloudstex" (num + 4)
--       # genrecv "cloudswet" (num + 5)
--       # genrecv "cloudsgain" (num + 6)
--       # genrecv "cloudsspread" (num + 7)
--       # genrecv "cloudsrvb" (num + 8)
--       # genrecv "cloudsfb" (num + 9)
--       # genrecv "cloudsfreeze" (num + 10)
