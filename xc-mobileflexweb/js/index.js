window.addEventListener('load', function() {

    let focus = this.document.querySelector('.focus')
    let ul = focus.children[0]
    let ol = focus.children[1]

    let w = focus.offsetWidth
    console.log('offsetwidth ' + w);
    let index = 0
    let timer = setInterval(() => {
        index++;
        // console.log(index);
        let transX = -index * w;
        // console.log(transX); -540 -1080 -1620
        ul.style.transition = 'all .3s'
        ul.style.transform = 'translateX(' + transX + 'px)'
    }, 2000);

    ul.addEventListener('transitionend', function() {
        if (index >= 3) {
            index = 0
            ul.style.transition = 'none'
            let transX = -index * w;
            ul.style.transform = 'translateX(' + transX + 'px)'
        } else if (index < 0) {
            index = 2
            ul.style.transition = 'none'
            let transX = -index * w;
            ul.style.transform = 'translateX(' + transX + 'px)'
        }

        //circle change along with pic moving
        ol.querySelector('li.current').classList.remove('current')
        ol.querySelectorAll('li')[index].classList.add('current')

    })

    //drag pic to move
    let startX = 0,
        moveX = 0,
        flag = false
    ul.addEventListener('touchstart', function(e) {

        startX = e.targetTouches[0].pageX
        clearInterval(timer)
            // console.log(startX);
    })
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - startX
        let transX = -index * w + moveX
        ul.style.transition = 'none'
        ul.style.transform = 'translateX(' + transX + 'px)'
        flag = true
        e.preventDefault()
    })
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    index--
                } else {
                    index++
                }
                let transX = -index * w;
                // console.log(transX);
                ul.style.transition = 'all .3s'
                ul.style.transform = 'translateX(' + transX + 'px)'
            } else {
                let transX = -index * w;
                // console.log(transX);
                ul.style.transition = 'all .1s'
                ul.style.transform = 'translateX(' + transX + 'px)'
            }

            clearInterval(timer)
            timer = setInterval(() => {
                index++;
                // console.log(index);
                let transX = -index * w;
                // console.log(transX);
                ul.style.transition = 'all .3s'
                ul.style.transform = 'translateX(' + transX + 'px)'
            }, 2000);
        }

    })

    let goBack = this.document.querySelector('.goBack')
    let nav = this.document.querySelector('nav')
    this.window.addEventListener('scroll', function() {
        if (this.window.pageYOffset > nav.offsetTop) {
            goBack.style.display = 'block'
        } else {
            goBack.style.display = 'none'
        }
    })

    goBack.addEventListener('click', function() {
        window.scroll(0, 0)
    })
})