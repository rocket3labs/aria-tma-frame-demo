export const openWindow = (urlOpen: string, widthN: number, heightN: number, targetTitle = 'target') => {
    const isMobileScreen = isMobile()
    if (typeof window !== 'undefined') {
        const {
            availTop, // 返回浏览器可用空间左边距离屏幕（系统桌面）左边界的距离。
            availLeft, // 返回浏览器可用空间左边距离屏幕（系统桌面）左边界的距离。
            availHeight, // 浏览器在显示屏上的可用高度，即当前屏幕高度
            availWidth, // 浏览器在显示屏上的可用宽度，即当前屏幕宽度
        } = window.screen as any
        const pageWidth = isMobileScreen ? availWidth * 0.8 : widthN // 弹出窗口的宽度
        const pageHeight = isMobileScreen ? availWidth * 0.8 : heightN // 弹出窗口的高度
        let pageTop = (availHeight - pageHeight) / 2 // 窗口的垂直位置
        let pageLeft = (availWidth - pageWidth) / 2 // 窗口的水平位置;
        let top = pageTop
        let left = pageLeft
        if (navigator.userAgent.indexOf('Chrome') !== -1) { // 兼容chrome的bug
            top += availTop // 距顶偏移值
            left += availLeft // 距左偏移值
        }
        window.open(urlOpen, targetTitle, `width=${pageWidth},height=${pageHeight},top=${top},left=${left}`) // 实现居中弹窗
    }

}

export const isMobile = () => {
    if (typeof document !== 'undefined') {
        const mobileWidth = 1024;
        const viewportWidth = document.documentElement.clientWidth;
        // console.log(viewportWidth)
        // console.log('isMobile', viewportWidth < mobileWidth)
        return viewportWidth < mobileWidth;
    }
}