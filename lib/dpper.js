"use strict";

define ([], function(){
	var opsmode;
	// dpper
	// -----
	// This procedure provides deep space long period periodic contributions
	// to the mean elements.  by design, these periodics are zero at epoch.
	// this used to be dscom which included initialization, but it's really a
	// recurring function.
	//
	//     you dont want to see this methods signature:/
	return function (e3,     ee2,    peo,    pgho,   pho,    pinco,  plo,    se2,
					 se3,    sgh2,   sgh3,   sgh4,   sh2,    sh3,    si2,    si3,
					 sl2,    sl3,    sl4,    t,      xgh2,   xgh3,   xgh4,   xh2,
					 xh3,    xi2,    xi3,    xl2,    xl3,    xl4,    zmol,
					 zmos,   inclo,  init,   ep,     inclp,  nodep, argpp,  mp) {
					// inputs:
					//
					//     e3          -
					//     ee2         -
					//     peo         -
					//     pgho        -
					//     pho         -
					//     pinco       -
					//     plo         -
					//     se2 , se3 , Sgh2, Sgh3, Sgh4, Sh2, Sh3, Si2, Si3, Sl2, Sl3, Sl4 -
					//     t           -
					//     xh2, xh3, xi2, xi3, xl2, xl3, xl4 -
					//     zmol        -
					//     zmos        -
					//     ep          - eccentricity                           0.0 - 1.0
					//     inclo       - inclination - needed for lyddane modification
					//     nodep       - right ascension of ascending node
					//     argpp       - argument of perigee
					//     mp          - mean anomaly

						 if (typeof(opsmode) === "undefined") {
							 opsmode = "i";
						 }
						 if ((opsmode !== "a") && (opsmode !== "i")) {
							 throw new Error("opsmode must be \"a\" or \"i\" but opsmode=" + opsmode);
						 }
					// locals:
					//
					//     alfdp       -
					//     betdp       -
					//     cosip  , sinip  , cosop  , sinop  ,
					//     dalf        -
					//     dbet        -
					//     dls         -
					//     f2, f3      -
					//     pe          -
					//     pgh         -
					//     ph          -
					//     pinc        -
					//     pl          -
					//     sel   , ses   , sghl  , sghs  , shl   , shs   , sil   , sinzf , sis   ,
					//     sll   , sls
					//     xls         -
					//     xnoh        -
					//     zf          -
					//     zm          -

						 var twopi = 2.0 * Math.PI,
						 // ## constants
						 zns   = 1.19459e-5,
						 zes   = 0.01675,
						 znl   = 1.5835218e-4,
						 zel   = 0.05490,
						 zm    = zmos + zns * t,
						 zf, sinzf, f2, f3, ses, sis, sls, sghs, shs,
						 sel, sil, sll, sghl, shll, pe, pinc, pl, pgh, ph,
						 sinip, cosip,
						 sinop, cosop, alfdp, dalf, dbet, betdp, xls, dls, xnoh;

						 // ## calculate time varying periodics
						 // be sure that the initial call has time set to zero
						 if (init === "y") {
							 zm = zmos;
						 }

						 zf    = zm + 2.0 * zes * Math.sin(zm);
						 sinzf = Math.sin(zf);
						 f2    =  0.5 * sinzf * sinzf - 0.25;
						 f3    = -0.5 * sinzf * Math.cos(zf);
						 ses   = se2 * f2 + se3 * f3;
						 sis   = si2 * f2 + si3 * f3;
						 sls   = sl2 * f2 + sl3 * f3 + sl4 * sinzf;
						 sghs  = sgh2 * f2 + sgh3 * f3 + sgh4 * sinzf;
						 shs   = sh2 * f2 + sh3 * f3;
						 zm    = zmol + znl * t;
						 if (init === "y") {
							 zm = zmol;
						 }
						 zf    = zm + 2.0 * zel * Math.sin(zm);
						 sinzf = Math.sin(zf);
						 f2    =  0.5 * sinzf * sinzf - 0.25;
						 f3    = -0.5 * sinzf * Math.cos(zf);
						 sel   = ee2 * f2 + e3 * f3;
						 sil   = xi2 * f2 + xi3 * f3;
						 sll   = xl2 * f2 + xl3 * f3 + xl4 * sinzf;
						 sghl  = xgh2 * f2 + xgh3 * f3 + xgh4 * sinzf;
						 shll  = xh2 * f2 + xh3 * f3;
						 pe    = ses + sel;
						 pinc  = sis + sil;
						 pl    = sls + sll;
						 pgh   = sghs + sghl;
						 ph    = shs + shll;

						 if (init === "n") {
							 //  0.2 rad = 11.45916 deg
							 pe    = pe - peo;
							 pinc  = pinc - pinco;
							 pl    = pl - plo;

							 pgh   = pgh - pgho;
							 ph    = ph - pho;
							 inclp = inclp + pinc;
							 ep    = ep + pe;
							 sinip = Math.sin(inclp);
							 cosip = Math.cos(inclp);

							 // ## apply periodics directly
							 //  sgp4fix for lyddane choice
							 //  strn3 used original inclination - this is technically feasible
							 //  gsfc used perturbed inclination - also technically feasible
							 //  probably best to readjust the 0.2 limit value and limit discontinuity
							 //  use next line for original strn3 approach and original inclination
							 //  `if (inclo >= 0.2)`
							 //  use next line for gsfc version and perturbed inclination
							 if (inclp >= 0.2) {
								 ph     = ph / sinip;
								 pgh    = pgh - cosip * ph;
								 argpp  = argpp + pgh;
								 nodep  = nodep + ph;
								 mp     = mp + pl;
							 }
							 else {
								 // ## apply periodics with lyddane modification
								 sinop  = Math.sin(nodep);
								 cosop  = Math.cos(nodep);
								 alfdp  = sinip * sinop;
								 betdp  = sinip * cosop;
								 dalf   =  ph * cosop + pinc * cosip * sinop;
								 dbet   = -ph * sinop + pinc * cosip * cosop;
								 alfdp  = alfdp + dalf;
								 betdp  = betdp + dbet;
								 nodep  = nodep % twopi;
								 // sgp4fix for afspc written intrinsic functions
								 // nodep used without a trigonometric function ahead
								 if ((nodep < 0.0) && (opsmode === "a")) {
									 nodep = nodep + twopi;
								 }
								 xls    = mp + argpp + cosip * nodep;
								 dls    = pl + pgh - pinc * nodep * sinip;
								 xls    = xls + dls;
								 xnoh   = nodep;
								 nodep  = Math.atan2(alfdp, betdp);
								 // sgp4fix for afspc written intrinsic functions
								 // nodep used without a trigonometric function ahead
								 if ((nodep < 0.0) && (opsmode === "a")) {
									 nodep = nodep + twopi;
								 }
								 if (Math.abs(xnoh - nodep) > Math.PI) {
									 if (nodep < xnoh) {
										 nodep = nodep + twopi;
									 }
									 else {
										 nodep = nodep - twopi;
									 }
								 }
								 mp    = mp + pl;
								 argpp = xls - mp - cosip * nodep;
							 }
						 } // if init == "n"

						// outputs
						// =======
						// dpper returns an object with the following attributes.
						//     ep          - eccentricity                           0.0 - 1.0
						//     inclp       - inclination
						//     nodep       - right ascension of ascending node
						//     argpp       - argument of perigee
						//     mp          - mean anomaly
						 return {
						 	ep: ep,
						 	inclp: inclp,
						 	nodep: nodep,
						 	argpp: argpp,
						 	mp: mp
						 };
					 };
});
