#define PI radians(180.0)

// See http://iquilezles.org/www/articles/palettes/palettes.htm for more information
vec3 palettes(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
    return a + b * cos(2.0 * PI *(c * t + d));
}
