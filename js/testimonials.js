// js/testimonials.js
        // testimonials.js
        const testimonials = [
            {
                quote: "Хонда Акорд 8, 2,4. Мотор k24z3, спочатку збільшилася витрата олії при інтенсивній їзді до 300гр на 1000км. Пропала тяга, мотор гарчить, але не їде, пробіг 170000. Почистив воднем, результат – 0. Після загорівся чек, поміняв верхній кисневий датчик 3500грн не оригінал, безрезультатно. Почистили у Дніпрі, після обнулення помилка не з'являлася. Пробіг після чищення близько 12000 км, витрата палива знизився до заявлених заводських параметрів з 16-17л до 11-12,5 в міському режимі.",
                name: "Володимир",
                designation: "Хонда Акорд 8, 2,4.",
                src: "https://katalizator-clean.com.ua/wp-content/uploads/2020/09/media-share-0-02-05-3285267db1e1c029001f6e60115d0f642ac9d6834d015fb87dd14ede7229ac0c-cb4791e1-5d09-4e2a-8cbf-5d551b551c5c.jpg",
            },
            {
                quote: "Придбали обладнення, налаштування та навчання декілька днів тому. Вже встигли протестувати на декількох автомобілях. Результатами задоволені, клієнти також. Дякуємо за професіоналізм та якісне обладнання.",
                name: "СТО КАТАЛІЗАТОР-Харків",
                designation: "Сергій",
                src: "https://katalizator-clean.com.ua/wp-content/uploads/2021/02/media-share-0-02-05-7.jpg",
            },
            {
                quote: "Після чищення автомобіль став їздити набагато краще, зникли провали в роботі двигуна, зменшився витрата пального. Рекомендую всім, хто хоче продовжити термін служби свого автомобіля.",
                name: "Станіслав",
                designation: "Rengrover Discovery 4",
                src: "https://katalizator-clean.com.ua/wp-content/uploads/2020/12/D726D0B9-B154-43E7-89CB-9FE76AA81B3D.png",
            },
            {
                quote: "офігезно чистить, машина їде як нова, рекомендую всім, хто хоче продовжити термін служби свого автомобіля.",
                name: "Вікторія",
                designation: "Rengrover Discovery 4444",
                src: "https://katalizator-clean.com.ua/wp-content/uploads/2020/12/D726D0B9-B154-43E7-89CB-9FE76AA81B3D.png",
            },
        ];

        let activeIndex = 0;
        const imageContainer = document.getElementById('image-container');
        const nameElement = document.getElementById('name');
        const designationElement = document.getElementById('designation');
        const quoteElement = document.getElementById('quote');
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');

        function calculateGap(width) {
            const minWidth = 1024;
            const maxWidth = 1456;
            const minGap = 60;
            const maxGap = 86;

            if (width <= minWidth) return minGap; if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 *
                (width -
                    maxWidth));

            return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
        }

        function updateTestimonial(direction) {
            const oldIndex = activeIndex;
            activeIndex = (activeIndex + direction + testimonials.length) % testimonials.length;

            const containerWidth = imageContainer.offsetWidth;
            const gap = calculateGap(containerWidth);
            const maxStickUp = gap * 0.8; // 80% of the calculated gap

            testimonials.forEach((testimonial, index) => {
                let img = imageContainer.querySelector(`[data-index="${index}"]`);
                if (!img) {
                    img = document.createElement('img');
                    img.src = testimonial.src;
                    img.alt = testimonial.name;
                    img.classList.add('testimonial-image');
                    img.dataset.index = index;
                    imageContainer.appendChild(img);
                }

                const offset = (index - activeIndex + testimonials.length) % testimonials.length;
                const zIndex = testimonials.length - Math.abs(offset);
                const opacity = index === activeIndex ? 1 : 1;
                const scale = index === activeIndex ? 1 : 0.85;

                let translateX, translateY, rotateY;
                if (offset === 0) {
                    translateX = '0%';
                    translateY = '0%';
                    rotateY = 0;
                } else if (offset === 1 || offset === -2) {
                    translateX = '20%';
                    translateY = `-${maxStickUp / img.offsetHeight * 100}%`;
                    rotateY = -15;
                } else {
                    translateX = '-20%';
                    translateY = `-${maxStickUp / img.offsetHeight * 100}%`;
                    rotateY = 15;
                }

                gsap.to(img, {
                    zIndex: zIndex,
                    opacity: opacity,
                    scale: scale,
                    x: translateX,
                    y: translateY,
                    rotateY: rotateY,
                    duration: 0.8,
                    ease: "power3.out"
                });
            });

            gsap.to([nameElement, designationElement], {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    nameElement.textContent = testimonials[activeIndex].name;
                    designationElement.textContent = testimonials[activeIndex].designation;
                    gsap.to([nameElement, designationElement], {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });

            gsap.to(quoteElement, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    quoteElement.innerHTML = testimonials[activeIndex].quote.split(' ').map(word => `<span
            class="word">${word}</span>`).join(' ');
                    gsap.to(quoteElement, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    animateWords();
                }
            });
        }

        function animateWords() {
            gsap.from('.word', {
                opacity: 0,
                y: 10,
                stagger: 0.02,
                duration: 0.2,
                ease: "power2.out"
            });
        }

        function handleNext() {
            updateTestimonial(1);
        }

        function handlePrev() {
            updateTestimonial(-1);
        }

        prevButton.addEventListener('click', handlePrev);
        nextButton.addEventListener('click', handleNext);

        // Initial setup
        updateTestimonial(0);

        // Autoplay functionality
        const autoplayInterval = setInterval(handleNext, 5000);

        // Stop autoplay on user interaction
        [prevButton, nextButton].forEach(button => {
            button.addEventListener('click', () => {
                clearInterval(autoplayInterval);
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => updateTestimonial(0));
