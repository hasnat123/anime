export function Slice(data, length)
{
    let sliced = data.slice(length);
    let sliceIndex = sliced.indexOf(" ");
    return data.slice(0, (length + sliceIndex)) + "...";
}