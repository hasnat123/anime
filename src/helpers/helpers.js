import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Slice(data, length)
{
    let sliced = data.slice(length);
    let sliceIndex = sliced.indexOf(" ");
    return data.slice(0, (length + sliceIndex)) + "...";
}

export function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }