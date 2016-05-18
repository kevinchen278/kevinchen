% VCType can be one of 256 different types fourth order variable
% co-occourrence defined with the given four mapping function in our paper.
% VCType can be from '2222', '2223', ..., '5555'.

vcType = '5543';

fea = SRMQ1('1.pgm');  % please use vc version, it is faster than the matlab version.

vcFea = getVCFeatureFromSRM(fea,vcType);


% 256 types VC can be divided to 36 different catagories VC using the codes
%   divideCat.m

% load mapping;
% cat = divideCat(g);
