export function loading() {
    let loader = document.getElementsByClassName("loading")
    loader.setAttribute("visibility", "visible");
}

export function notloading() {
    let loader = document.getElementsByClassName("loading")
    loader.setAttribute("visibility", "hidden");
}