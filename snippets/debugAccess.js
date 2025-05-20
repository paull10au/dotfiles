function debugAccess(object, prop, debugGet){
    var originalProp = getPropertyDescriptor(object, prop);
    var isSimpleValue = "value" in originalProp; // rather than getter + setter

    Object.defineProperty(object, prop, {
        get: function(){
            if (debugGet) {
                debugger;
            }
            if (isSimpleValue) {
                return originalProp.value;
            } else {
                return originalProp.get.apply(this, arguments);    
            }
        },
        set: function(newValue){
            debugger;
            if (isSimpleValue) {
                return originalProp.value = newValue;
            } else {
                return originalProp.set.apply(this, arguments);
            }
        }
    });

    function getPropertyDescriptor(object, propertyName){
        var descriptor = Object.getOwnPropertyDescriptor(object, propertyName);
        if (!object){
            throw new Error("Descriptor " + propertyName + " not found");
        }
        if (!descriptor) {
            return getPropertyDescriptor(Object.getPrototypeOf(object), propertyName);
        }
        return descriptor;
    }
}