#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <WiFiUdp.h>



//--- Pin Definitions ---//
const int SOIL_PIN = 34; 
//-- Soil Moisture Sensor connected to GPIO 34 - pin 10--//


//--- Relative Values ---//
const double drySoilThreshold = 1000.0;
const double wetSoilThreshold = 3000.0;
//-- Use In-Situ Calibration Values --//

//--- Function Prototypes ---//


//Uses Topp Equation to convert raw voltage
void useToppEquation(double rawValue){
  //Topp equation x = -5.3*10^-2 + 2.92*10^-2*rawValue - 5.5*10^-4*rawValue^2 + 4.3*10^-6*rawValue^3
  //air = 1, soil = 3, water = 80
  double Ka = (double)(rawValue - drySoilThreshold) * (80.0 - 1.0) / (wetSoilThreshold - drySoilThreshold) + 1.0;
  double theta = -0.053 + 0.0292 * Ka - 0.00055 * Ka * Ka + 0.0000043 * Ka * Ka * Ka;
  double volumetricWaterContent = theta * 100.0; // Convert to percentage
  Serial.print("Volumetric Water Content: ");

  Serial.println(volumetricWaterContent); //print the value to Serial Monitor(Terminal)
  delay(2000); // Wait for 2 seconds before the next reading

}

void usePercentageMethod(double rawValue){
  double calculatedPercent = (float)(rawValue - drySoilThreshold) * 100.0 / (wetSoilThreshold - drySoilThreshold);
  int soilMoisturePercent = constrain(calculatedPercent, 0, 100); // Ensure the value is within 0-100 range

  Serial.print("Soil Moisture Percentage: ");
  Serial.println(soilMoisturePercent); // Print the value to Serial Monitor(Terminal)
  delay(2000); // Wait for 2 seconds before the next reading
}


void setup() {
  Serial.begin(115200); //bits pers second since each baud = 1 bit
  pinMode(SOIL_PIN, INPUT); // Set soil moisture sensor pin as input
}

void loop() {
  // put your main code here, to run repeatedly:
  int soilMoistureValue = analogRead(SOIL_PIN); // Read the soil moisture sensor value

  usePercentageMethod(soilMoistureValue);
  // Alternatively, you can use the Topp equation method:
}

