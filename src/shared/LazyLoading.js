const LazyLoading = (props) => {
    const { target, callback, options } = props;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                callback({
                    entries,
                    entry,
                });
            }
        });
    }, options);

    target && observer.observe(target);
    return props.children;
};

export default LazyLoading;
