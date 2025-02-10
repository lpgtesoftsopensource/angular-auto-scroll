import { Component } from '@angular/core';

@Component({
  selector: 'app-horizentral-animation',
  imports: [],
  templateUrl: './horizentral-animation.component.html',
  styleUrl: './horizentral-animation.component.css',
})
export class HorizentralAnimationComponent {
  animationStatus: boolean = true;

  constructor() {}

  ngAfterViewInit() {
    this.startAnimationContainer('animation1');
  }

  startAnimationContainer(containerName: string) {
    let animationContainer = document.getElementById(containerName)!;
    let mapArrayLefts = new Map<string, any>();
    let marginBetweenAnimatedItems = 200;
    let lastElementLeft = 0;
    let isViewInitilized: boolean = false;
    let allAnimatedItemsWidth = 0;
    let containerAnimatedWidth = 0;

    var timer = setInterval(() => {
      let animatedNodes = animationContainer.querySelectorAll<HTMLElement>(
        '#' + containerName + ' .animatedItem'
      );
      containerAnimatedWidth = animationContainer.getBoundingClientRect().width;

      //Init the View before Starting the animation
      if (animatedNodes.length > 0) {
        if (isViewInitilized == false) {
          isViewInitilized = true;

          animatedNodes?.forEach((element, index) => {
            let itemWidth = element.getBoundingClientRect().width;
            allAnimatedItemsWidth = allAnimatedItemsWidth + itemWidth;
          });

          animatedNodes?.forEach((element, index) => {
            if (index == 0 && allAnimatedItemsWidth < containerAnimatedWidth) {
              let elLeft = containerAnimatedWidth + 1;
              element.style.left = elLeft + 'px';
              mapArrayLefts.set(element.id, elLeft);
            } else if (
              index == 0 &&
              allAnimatedItemsWidth > containerAnimatedWidth
            ) {
              let elLeft = 0;
              element.style.left = elLeft + 'px';
              mapArrayLefts.set(element.id, elLeft);
            } else {
              let leftPrecdElement =
                animatedNodes[index - 1]?.getBoundingClientRect().left;
              let leftNewElem = leftPrecdElement + marginBetweenAnimatedItems;
              element.style.left = leftNewElem + 'px';
              mapArrayLefts.set(element.id, leftNewElem);
            }
          });

          lastElementLeft = mapArrayLefts.get(
            animatedNodes[animatedNodes.length - 1].id
          );
        }
      }

      // Starting the Animation

      if (this.animationStatus == true) {
        for (let i = 0; i < animatedNodes!.length; i++) {
          let elLeft = mapArrayLefts.get(animatedNodes[i].id);
          let newElLX = Number.parseFloat(elLeft) - 1;

          mapArrayLefts.set(animatedNodes[i].id, newElLX);
          animatedNodes[i].style.left = newElLX + 'px';
        }

        let topHtmlElement = document.querySelector<HTMLElement>(
          '#' + containerName + ' .animatedItem'
        );
        let topHtmlElementRight = topHtmlElement!.getBoundingClientRect().right;

        if (topHtmlElementRight < 0) {
          topHtmlElement!.style.left = lastElementLeft + 'px';
          animationContainer!.removeChild(topHtmlElement!);
          animationContainer!.appendChild(topHtmlElement!);

          mapArrayLefts.set(topHtmlElement!.id, lastElementLeft);
        }
      }
    }, 10);
  }

  setAnimationsStatus(status: string) {
    if (status == 'pause') {
      this.animationStatus = false;
    }

    if (status == 'animate') {
      this.animationStatus = true;
    }
  }
}
