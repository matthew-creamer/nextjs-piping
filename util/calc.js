export const GetActualOutsideDiameter = (pipe_size) => {
    let val;
    switch (parseFloat(pipe_size.replace(/\.?0+$/, ""))) {
        case 0.125: val = 10.300; break;
        case 0.250: val = 13.700; break;
        case 0.357: val = 17.100; break;
        case 0.500: val = 21.300; break;
        case 0.750: val = 26.700; break;
        case 1.000: val = 33.400; break;
        case 1.250: val = 42.200; break;
        case 1.500: val = 48.300; break;
        case 2.000: val = 60.300; break;
        case 2.500: val = 73.000; break;
        case 3.000: val = 88.900; break;
        case 3.500: val = 101.600; break;
        case 4.000: val = 114.300; break;
        case 5.000: val = 141.300; break;
        case 6.000: val = 168.300; break;
        case 8.000: val = 219.100; break;
        case 10.000: val = 273.000; break;
        case 12.000: val = 323.800; break;
        case 14.000: val = 355.600; break;
        case 16.000: val = 406.400; break;
        case 18.000: val = 457.000; break;
        default: val = 0; break;
    }
    return val;
}

export const GetDesignThickness = (design_pressure, actual_outside_diameter, stress, joint_efficiency) => {
    return (design_pressure * actual_outside_diameter) / (2 * stress * joint_efficiency) + (2 * design_pressure * 0.4);
}

export const GetStructuralThickness = (pipe_size) => {
    if (pipe_size <= 2)
        return 1.80;
    else if (pipe_size === 3)
        return 2.00;
    else if (pipe_size === 4)
        return 2.30;
    else if (6 <= pipe_size <= 18)
        return 2.80;
    else if (pipe_size >= 20)
        return 3.10;
}

export const GetRequiredThickness = (design_thickness, actual_outside_diameter) => {
    return Math.max(design_thickness, actual_outside_diameter);
}